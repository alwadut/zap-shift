import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

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

  // 🔥 Watch Fields
  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const senderDistrict = watch("senderDistrict");
  const receiverRegion = watch("receiverRegion");
  const receiverDistrict = watch("receiverDistrict");

  // 🔥 Unique Regions
  const regions = [...new Set(warehouses.map((item) => item.region))];

  // 🔥 Filter Sender Districts
  const senderDistricts = useMemo(() => {
    return warehouses.filter((w) => w.region === senderRegion);
  }, [senderRegion, warehouses]);

  // 🔥 Filter Receiver Districts
  const receiverDistricts = useMemo(() => {
    return warehouses.filter((w) => w.region === receiverRegion);
  }, [receiverRegion, warehouses]);

  // 🔥 Sender Covered Area
  const senderAreas = useMemo(() => {
    const found = warehouses.find(
      (w) => w.district === senderDistrict
    );
    return found?.covered_area || [];
  }, [senderDistrict, warehouses]);

  // 🔥 Receiver Covered Area
  const receiverAreas = useMemo(() => {
    const found = warehouses.find(
      (w) => w.district === receiverDistrict
    );
    return found?.covered_area || [];
  }, [receiverDistrict, warehouses]);

  // 🔥 Reset dependent fields
  useEffect(() => {
    resetField("senderDistrict");
    resetField("senderServiceCenter");
  }, [senderRegion, resetField]);

  useEffect(() => {
    resetField("receiverDistrict");
    resetField("receiverServiceCenter");
  }, [receiverRegion, resetField]);

  //  Cost Calculation
  const calculateCost = (data) => {
    let cost = data.type === "document" ? 60 : 120;

    if (data.type === "non-document" && data.weight) {
      const weight = parseFloat(data.weight);
      cost += weight * 15;
    }

    if (data.senderDistrict !== data.receiverDistrict) {
      cost += 50;
    }

    return cost;
  };

  const onSubmit = (data) => {
    console.log("the form data is ",data);
    const cost = calculateCost(data);
    

    toast((t) => (
      <div>
        <p className="font-bold text-lg">Delivery Cost: ৳{cost}</p>
        <button
          className="btn btn-success btn-sm mt-3 w-full"
          onClick={() => handleConfirm(data, cost, t.id)}
        >
          Confirm
        </button>
      </div>
    ));
  };

  const handleConfirm = async (data, cost, toastId) => {
    const parcelData = {
      ...data,
      deliveryCost: cost,
      trackingId: "TRK" + Date.now(),
      status: "pending",
      creation_date: new Date(),
    };

    try {
      await axios.post("http://localhost:5000/parcels", parcelData);
      toast.success("Parcel Created Successfully!");
     
      reset();
    } catch (err) {
      toast.error("Failed to save parcel");
    }

    toast.dismiss(toastId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      <Toaster />

      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          Send Parcel
        </h1>
        <p className="text-gray-500">
          Door to Door Delivery Service
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

        {/* ================= Parcel Info ================= */}
        <div className="card bg-base-100 shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Parcel Info
          </h2>

          <div className="flex gap-6 mb-4">
            <label className="cursor-pointer flex gap-2 items-center">
              <input
                type="radio"
                value="document"
                className="radio radio-primary"
                {...register("type", { required: true })}
              />
              Document
            </label>

            <label className="cursor-pointer flex gap-2 items-center">
              <input
                type="radio"
                value="non-document"
                className="radio radio-primary"
                {...register("type", { required: true })}
              />
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
            className="textarea textarea-bordered w-full mt-4"
            {...register("description", { required: true })}
          />
        </div>

        {/* ================= Sender & Receiver ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Sender */}
          <div className="card bg-base-100 shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold">
              Sender Info
            </h2>

            <input
              placeholder="Sender Name"
              className="input input-bordered w-full"
              {...register("senderName", { required: true })}
            />

            <input
              placeholder="Contact"
              className="input input-bordered w-full"
              {...register("senderContact", { required: true })}
            />

            {/* Region */}
            <select
              className="select select-bordered w-full"
              {...register("senderRegion", { required: true })}
            >
              <option value="">Select Region</option>
              {regions.map((region, i) => (
                <option key={i} value={region}>
                  {region}
                </option>
              ))}
            </select>

            {/* District */}
            <select
              className="select select-bordered w-full"
              {...register("senderDistrict", { required: true })}
            >
              <option value="">Select District</option>
              {senderDistricts.map((item, i) => (
                <option key={i} value={item.district}>
                  {item.district}
                </option>
              ))}
            </select>

            {/* Covered Area */}
            <select
              className="select select-bordered w-full"
              {...register("senderServiceCenter", { required: true })}
            >
              <option value="">Select Area</option>
              {senderAreas.map((area, i) => (
                <option key={i} value={area}>
                  {area}
                </option>
              ))}
            </select>

            <textarea
              placeholder="Pickup Instruction"
              className="textarea textarea-bordered w-full"
              {...register("pickupInstruction", { required: true })}
            />
          </div>

          {/* Receiver */}
          <div className="card bg-base-100 shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold">
              Receiver Info
            </h2>

            <input
              placeholder="Receiver Name"
              className="input input-bordered w-full"
              {...register("receiverName", { required: true })}
            />

            <input
              placeholder="Contact"
              className="input input-bordered w-full"
              {...register("receiverContact", { required: true })}
            />

            <select
              className="select select-bordered w-full"
              {...register("receiverRegion", { required: true })}
            >
              <option value="">Select Region</option>
              {regions.map((region, i) => (
                <option key={i} value={region}>
                  {region}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered w-full"
              {...register("receiverDistrict", { required: true })}
            >
              <option value="">Select District</option>
              {receiverDistricts.map((item, i) => (
                <option key={i} value={item.district}>
                  {item.district}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered w-full"
              {...register("receiverServiceCenter", { required: true })}
            >
              <option value="">Select Area</option>
              {receiverAreas.map((area, i) => (
                <option key={i} value={area}>
                  {area}
                </option>
              ))}
            </select>

            <textarea
              placeholder="Delivery Instruction"
              className="textarea textarea-bordered w-full"
              {...register("deliveryInstruction", { required: true })}
            />
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
