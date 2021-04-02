import React, { useState } from "react";
import Calendar from "react-calendar";

import { NpaContext } from "../Context";
import "react-calendar/dist/Calendar.css";

function Home() {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <h1>Home</h1>
      <Calendar value={date} onChange={setDate} />
    </div>
  );
}

export default Home;
