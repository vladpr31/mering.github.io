import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorsByCategory } from "../../../../Redux/Actions/doctorActions";
import DoctorCard from "./DoctorCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faArrowUpShortWide,
} from "@fortawesome/free-solid-svg-icons";
import BottomNav from "../../../UI/Navbar/BottomNav";
import useWindowSize from "../../../../hooks/useWindowSize";

//this array can be changed to fetch all the clinic names from the api.
const clinicLocations = [
  "Ashdod M.R Center",
  "Tel Aviv M.R Center",
  "Beer Sheva M.R Center",
];
const NewAppointmentCreation = () => {
  const { doctors } = useSelector((state) => state.doctors);
  const { width } = useWindowSize();
  const [filter, setFilter] = useState("");
  const [ratingSort, setRatingSort] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadDoctors = () => {
      dispatch(getDoctorsByCategory(params.doctorType.replace("-", " ")));
    };
    loadDoctors();
  }, []);

  const handleFilter = (e) => {
    const { value } = e.target;
    setFilter(value === "All" ? "" : value);
  };

  const calculateAverageRating = (doctor) => {
    const totalRating = doctor.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return totalRating / doctor.reviews.length;
  };

  const sortedDoctorsArray = [...doctors].sort((doctor1, doctor2) => {
    const rating1 = calculateAverageRating(doctor1);
    const rating2 = calculateAverageRating(doctor2);
    return ratingSort ? rating2 - rating1 : rating1 - rating2;
  });

  const filteredAndSortedDoctors = sortedDoctorsArray.filter((doctor) =>
    filter ? doctor.clinic.clinicName === filter : true
  );

  return (
    <div className="w-full md:h-screen">
      <div className="flex justify-center gap-x-4 py-4">
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={handleFilter}
          defaultValue={"DEFAULT"}
        >
          <option value="DEFAULT" disabled>
            Filter By Clinic...
          </option>
          <option>All</option>
          {clinicLocations.map((location, index) => (
            <option key={index}>{location}</option>
          ))}
        </select>
        <button
          className="p-2 rounded-lg bg-white items-center hover:bg-blue-500 hover:text-white"
          onClick={() => setRatingSort(!ratingSort)}
        >
          Sort By Rating
          {ratingSort ? (
            <FontAwesomeIcon icon={faArrowDownShortWide} className="ml-2" />
          ) : (
            <FontAwesomeIcon icon={faArrowUpShortWide} className="ml-2" />
          )}
        </button>
      </div>
      <div className="text-left pb-20 lg:pb-0 flex flex-col justify-center items-center ">
        <ul className="h-full">
          {filteredAndSortedDoctors.map((doctor, index) => (
            <li key={index}>
              <DoctorCard props={{ doctor }} />
            </li>
          ))}
        </ul>
        {width <= 768 ? <BottomNav /> : null}
      </div>
    </div>
  );
};

export default NewAppointmentCreation;
