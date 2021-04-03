import React, { useState } from "react";
import Calendar from "react-calendar";

import FollowUpsTable from "./FollowUpsTable";

import { NpaContext } from "../Context";
import "react-calendar/dist/Calendar.css";

function Home() {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <Calendar value={date} onChange={setDate} />
      <FollowUpsTable />
    </div>
  );
}

export default Home;
