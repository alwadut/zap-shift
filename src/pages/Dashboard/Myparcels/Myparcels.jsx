import React, { useState } from "react";
import UseAuth from "../../../Hooks/useAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Myparcels = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  console.log(user);
  const [selectedParcel, setSelectedParcel] = useState(null);

  const { data: parcels = [],refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleView = (parcel) => {
    setSelectedParcel(parcel);
  };




const handleDelete = async (parcel) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This parcel will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      const res = await axiosSecure.delete(`/parcels/${parcel._id}`);

      if (res.data.deletedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your parcel has been deleted.",
          timer: 1500,
          showConfirmButton: false,
        });

        refetch(); // 🔥 refresh react-query data
      }
    } catch (error) {
      console.error(error);
    }
  }
};

  return (
    <div className="mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">📦 My Parcels</h1>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table table-zebra">
          <thead className="bg-primary text-white">
            <tr>
              <th>Created</th>
              <th>Tracking ID</th>
              <th>Type</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="hover">
                <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>

                <td className="font-semibold text-primary">
                  {parcel.trackingId}
                </td>

                <td>
                  <span className="badge badge-info badge-outline capitalize">
                    {parcel.type}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge ${
                      parcel.status === "pending"
                        ? "badge-warning"
                        : "badge-success"
                    }`}
                  >
                    {parcel.status}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge ${
                      parcel.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {parcel.paymentStatus}
                  </span>
                </td>

                <td className="space-x-2">
                  {/* View Button */}
                  <button
                    onClick={() => handleView(parcel)}
                    className="btn btn-xs btn-primary"
                  >
                    View
                  </button>

                  {/* Pay Button (only if unpaid) */}
                  {parcel.paymentStatus === "unpaid" && (
                    <button
                      onClick={() => handlePay(parcel)}
                      className="btn btn-xs btn-success"
                    >
                      Pay
                    </button>
                  )}

                  {/* Cancel Button (only if pending) */}
                  {parcel.status === "pending" && (
                    <button
                      onClick={() => handleDelete(parcel)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 MODAL */}
      {selectedParcel && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4 text-primary">
              Parcel Details
            </h3>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <p>
                <strong>Tracking ID:</strong> {selectedParcel.trackingId}
              </p>
              <p>
                <strong>Type:</strong> {selectedParcel.type}
              </p>
              <p>
                <strong>Status:</strong> {selectedParcel.status}
              </p>
              <p>
                <strong>Payment:</strong> {selectedParcel.paymentStatus}
              </p>
              <p>
                <strong>Delivery Cost:</strong> ৳{selectedParcel.deliveryCost}
              </p>
              <p>
                <strong>Delivery Time:</strong> {selectedParcel.deliveryTime}
              </p>
              <p>
                <strong>Sender:</strong> {selectedParcel.senderName}
              </p>
              <p>
                <strong>Receiver:</strong> {selectedParcel.receiverName}
              </p>
              <p className="col-span-2">
                <strong>Description:</strong> {selectedParcel.description}
              </p>
              <p className="col-span-2">
                <strong>Created At:</strong>{" "}
                {new Date(selectedParcel.creation_date).toLocaleString(
                  "en-BD",
                  {
                    dateStyle: "medium",
                    timeStyle: "short",
                  },
                )}
              </p>
            </div>

            <div className="modal-action">
              <button
                onClick={() => setSelectedParcel(null)}
                className="btn btn-error btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Myparcels;
