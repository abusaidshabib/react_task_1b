import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import moment from "moment";
import Cards from "../components/Cards";
import MkdSDK from "../utils/MkdSDK";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import DraggableCard from "../components/DraggableCard";

const AdminDashboardPage = () => {

  const [currentDate, setCurrentDate] = useState(moment());
  const [apiData, setApiData] = useState([]);
  const [payload, setPayload] = useState({page: 1, limit: 10});
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPayload((prevPayload) => ({ ...prevPayload, page: newPage }));
    }
  };

  const generatePageNumbers = () => {
    const displayPages = [];
    const maxPagesToShow = 5;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= payload.page - Math.floor(maxPagesToShow / 2) &&
          i <= payload.page + Math.floor(maxPagesToShow / 2))
      ) {
        displayPages.push(i);
      } else if (
        displayPages.length > 0 &&
        displayPages[displayPages.length - 1] !== "..."
      ) {
        displayPages.push("...");
      }
    }
    return displayPages;
  };

useEffect(() => {
  let sdk = new MkdSDK();

  sdk
    .callRestAPI(payload, "PAGINATE")
    .then((paginateResult) => {
      setApiData(paginateResult.list);
      setTotalPages(Math.ceil(paginateResult.total / payload.limit));
    })
    .catch((error) => {
      console.error("Error in PAGINATE API:", error.message);
    });
}, [payload]);


useEffect(() => {
  const updateDateTime = () => {
    setCurrentDate(moment());
  };
  const intervalId = setInterval(updateDateTime, 1000);
  return () => clearInterval(intervalId);
}, []);

    const formattedDate = currentDate.format('D MMMM YYYY');
    const formattedTime = currentDate.format('HH:mm');

    const moveCard = (fromIndex, toIndex) => {
      const newData = [...apiData];
      const [removed] = newData.splice(fromIndex, 1);
      newData.splice(toIndex, 0, removed);
      setApiData(newData);
    };

  return (
    <DndProvider backend={HTML5Backend}>
      <>
      <div className="bg-primary">
      <Navbar/>
      <div className="p-[112px] lg:px-20">
        <div className="flex justify-between">
          <p className="text-white text-5xl font-thin">Today's leaderboard</p>
          <div className="bg-primary-v1 p-3 rounded-2xl flex gap-1 justify-center items-center text-base text-secondary font-thin text-center">
              <p className="">
              {formattedDate}
          </p>
          <p>.</p>
          <button className="text-sm bg-neural px-1 rounded-md text-primary font-light">Submissions OPEN</button>
          <p>.</p>
          <p className="">{formattedTime}</p>
          </div>
        </div>
        <br/>
        <br/>
        <div className="flex justify-between items-center px-3 text-base text-secondary-v2 font-thin">
          <p><span className="px-8">#</span>Title</p>
          <p>Author</p>
          <select className="bg-transparent outline-none" defaultValue="Most Liked">
            <option value="Most Liked">Most Liked</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <br/>
        <div className="grid gap-5">
          {apiData.length > 0 &&
            apiData?.map((data, index) => (
              <DraggableCard key={data.id} data={data} index={index} moveCard={moveCard} />
            ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-4 pt-10">
        <button
          className="bg-neural text-primary px-4 py-2 rounded"
          onClick={() => handlePageChange(payload.page - 1)}
          disabled={payload.page === 1}
        >
          Previous
        </button>
        {generatePageNumbers().map((page, index) => (
          <button
            key={index}
            className={`${
              page === "..."
                ? "text-secondary-v2"
                : payload.page === page
                ? "bg-neural text-primary"
                : "border border-secondary-v2 text-secondary-v2"
            } px-4 py-2 rounded`}
            onClick={() => handlePageChange(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
        <button
          className="bg-neural text-primary px-4 py-2 rounded"
          onClick={() => handlePageChange(payload.page + 1)}
          disabled={payload.page === totalPages}
        >
          Next
        </button>
      </div>
      </div>
      </div>
    </>
    </DndProvider>
  );
};

export default AdminDashboardPage;


