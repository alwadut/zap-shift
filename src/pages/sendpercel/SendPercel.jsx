import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import UseAuth from "../../Hooks/useAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const SendParcel = () => {
  const warehouses = useLoaderData();

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    reset,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
  });

  const {user} = UseAuth();
  const axiosSecure = UseAxiosSecure();
  
  // ================= WATCH FIELDS =================
  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const senderDistrict = watch("senderDistrict");
  const receiverDistrict = watch("receiverDistrict");

  // ================= UNIQUE REGIONS =================
  const regions = [...new Set(warehouses.map((item) => item.region))];

  // ================= FILTER DISTRICTS =================
  const senderDistricts = useMemo(() => {
    return warehouses.filter((w) => w.region === senderRegion);
  }, [senderRegion, warehouses]);

  const receiverDistricts = useMemo(() => {
    return warehouses.filter((w) => w.region === receiverRegion);
  }, [receiverRegion, warehouses]);

  // ================= FILTER COVERED AREA =================
  const senderAreas = useMemo(() => {
    const found = warehouses.find((w) => w.district === senderDistrict);
    return found?.covered_area || [];
  }, [senderDistrict, warehouses]);

  const receiverAreas = useMemo(() => {
    const found = warehouses.find((w) => w.district === receiverDistrict);
    return found?.covered_area || [];
  }, [receiverDistrict, warehouses]);

  // ================= RESET DEPENDENT FIELDS =================
  useEffect(() => {
    resetField("senderDistrict");
    resetField("senderServiceCenter");
  }, [senderRegion, resetField]);

  useEffect(() => {
    resetField("receiverDistrict");
    resetField("receiverServiceCenter");
  }, [receiverRegion, resetField]);

  // ================= COST CALCULATION =================
  const calculateCost = (data) => {
    let cost = data.type === "document" ? 60 : 120;

    if (data.type === "non-document" && data.weight) {
      cost += parseFloat(data.weight) * 15;
    }

    if (data.senderDistrict !== data.receiverDistrict) {
      cost += 50;
    }

    return cost;
  };

  // ================= PRICING BREAKDOWN =================
  const getPricingBreakdown = (data) => {
    let breakdown = [];

    if (data.type === "document") {
      breakdown.push({ label: "Document Charge", amount: 60 });
    } else {
      breakdown.push({ label: "Non-Document Charge", amount: 120 });

      if (data.weight) {
        breakdown.push({
          label: `Weight Charge (${data.weight}kg × 15)`,
          amount: parseFloat(data.weight) * 15,
        });
      }
    }

    if (data.senderDistrict !== data.receiverDistrict) {
      breakdown.push({ label: "Inter-District Charge", amount: 50 });
    }

    return breakdown;
  };

  // ================= FORM SUBMIT =================
  const onSubmit = async (data) => {
    console.log(data);
    const cost = calculateCost(data);
    const breakdown = getPricingBreakdown(data);

    const breakdownHTML = breakdown
      .map(
        (item) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span>${item.label}</span>
          <span>৳${item.amount}</span>
        </div>
      `
      )
      .join("");

    const result = await Swal.fire({
      title: "Delivery Cost Breakdown",
      html: `
        ${breakdownHTML}
        <hr/>
        <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:18px; margin-top:10px;">
          <span>Total</span>
          <span>৳${cost}</span>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Cancel Parcel",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
    });

    if (result.isConfirmed) {
      handleConfirm(data, cost);
    }
  };

  // ================= SAVE PARCEL =================
const handleConfirm = async (data, cost) => {
  const deliveryTime =
    data.senderDistrict === data.receiverDistrict
      ? "24 Hours"
      : "48-72 Hours";

  const parcelData = {
    ...data,
    email: user?.email,
    weight: data.type === "document" ? null : data.weight,
    deliveryCost: cost,
    trackingId: `TRK-${Date.now()}`, // `TRK-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    status: "pending",
    paymentStatus: "unpaid",
    deliveryTime,
    creation_date: new Date().toISOString(),
  };

  try {
    const res = await axiosSecure.post("/parcels", parcelData);

    console.log(res.data);

    if (res.data.insertedId) {
      await Swal.fire({
        icon: "success",
        title: "Parcel Created Successfully!",
        html: `
          <p><strong>Tracking ID:</strong> ${parcelData.trackingId}</p>
          <p><strong>Delivery Cost:</strong> ৳${cost}</p>
          <p class="text-sm text-gray-500 mt-2">Status: Pending | Payment: Unpaid</p>
        `,
        confirmButtonColor: "#16a34a",
      });
       // toDO in future  Redirect to payment page AFTER popup closes
      reset();
    }
  } catch (error) {
    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Failed to save parcel",
      text: "Please try again later.",
    });
  }
};



  // ================= UI =================
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Send Parcel</h1>
        <p className="text-gray-500">Door to Door Delivery Service</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

        {/* ================= PARCEL INFO ================= */}
        <div className="card bg-base-100 shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">Parcel Info</h2>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="document" className="radio radio-primary"
                {...register("type", { required: true })} />
              Document
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="non-document" className="radio radio-primary"
                {...register("type", { required: true })} />
              Non Document
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Parcel Title"
              className="input input-bordered w-full"
              {...register("title", { required: true })}
            />

            {parcelType === "non-document" && (
              <input
                type="number"
                placeholder="Weight (kg)"
                className="input input-bordered w-full"
                {...register("weight")}
              />
            )}
          </div>

          <textarea
            placeholder="Parcel Description"
            className="textarea textarea-bordered w-full"
            {...register("description", { required: true })}
          />
        </div>

        {/* ================= SENDER & RECEIVER ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Sender */}
          <div className="card bg-base-100 shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">Sender Info</h2>

            <input className="input input-bordered w-full"
              placeholder="Sender Name"
              {...register("senderName", { required: true })} />

            <input className="input input-bordered w-full"
              placeholder="Contact"
              {...register("senderContact", { required: true })} />

            <select className="select select-bordered w-full"
              {...register("senderRegion", { required: true })}>
              <option value="">Select Region</option>
              {regions.map((region, i) => (
                <option key={i} value={region}>{region}</option>
              ))}
            </select>

            <select className="select select-bordered w-full"
              {...register("senderDistrict", { required: true })}>
              <option value="">Select District</option>
              {senderDistricts.map((item, i) => (
                <option key={i} value={item.district}>{item.district}</option>
              ))}
            </select>

            <select className="select select-bordered w-full"
              {...register("senderServiceCenter", { required: true })}>
              <option value="">Select Area</option>
              {senderAreas.map((area, i) => (
                <option key={i} value={area}>{area}</option>
              ))}
            </select>

            <textarea className="textarea textarea-bordered w-full"
              placeholder="Pickup Instruction"
              {...register("pickupInstruction", { required: true })} />
          </div>

          {/* Receiver */}
          <div className="card bg-base-100 shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">Receiver Info</h2>

            <input className="input input-bordered w-full"
              placeholder="Receiver Name"
              {...register("receiverName", { required: true })} />

            <input className="input input-bordered w-full"
              placeholder="Contact"
              {...register("receiverContact", { required: true })} />

            <select className="select select-bordered w-full"
              {...register("receiverRegion", { required: true })}>
              <option value="">Select Region</option>
              {regions.map((region, i) => (
                <option key={i} value={region}>{region}</option>
              ))}
            </select>

            <select className="select select-bordered w-full"
              {...register("receiverDistrict", { required: true })}>
              <option value="">Select District</option>
              {receiverDistricts.map((item, i) => (
                <option key={i} value={item.district}>{item.district}</option>
              ))}
            </select>

            <select className="select select-bordered w-full"
              {...register("receiverServiceCenter", { required: true })}>
              <option value="">Select Area</option>
              {receiverAreas.map((area, i) => (
                <option key={i} value={area}>{area}</option>
              ))}
            </select>

            <textarea className="textarea textarea-bordered w-full"
              placeholder="Delivery Instruction"
              {...register("deliveryInstruction", { required: true })} />
          </div>
        </div>

        <button className="btn btn-primary w-full text-lg">
          Submit Parcel
        </button>

      </form>
    </div>
  );
};

export default SendParcel;
