import React, { useEffect, useState } from 'react';
import UseAuth from '../../../Hooks/useAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';

const Myparcels = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const [parcels, setParcels] = useState([]); // ✅ Add state

  useEffect(() => {
    if (user?.email) {   // ✅ check first
      axiosSecure
        .get(`/myparcels?email=${user.email}`)
        .then(res => {
          setParcels(res.data);
        })
        .catch(error => console.error(error));
    }
  }, [user, axiosSecure]); // ✅ better dependency

  return (
    <div>
      <h1>My Parcels</h1>

      {
        parcels.map(parcel => (
          <div key={parcel._id}>
            <p>Tracking ID: {parcel.trackingId}</p>
            <p>Status: {parcel.status}</p>
            <p>Payment: {parcel.paymentStatus}</p>

            <hr />
          </div>
        ))
      }

    </div>
  );
};

export default Myparcels;
