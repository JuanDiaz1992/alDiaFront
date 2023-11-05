import "../styleheets/HistoryFinancial.css"
import { useState } from "react";
import ViewHistory from "../components/History_financial_components/ViewHistory";
import SelectOption from "../components/History_financial_components/SelectOptionHistory";
import { useEffect } from "react";
import {Tabs, Tab} from "@nextui-org/react";
function HistoryFinancial() {
  let options=[
    { 
      "name":"INGRESOS",
      "type":<ViewHistory 
      table={"income"}
    />
    },
    {
      "name":"EGRESOS",
      "type":<ViewHistory 
      table={"expenses"}
      />
    }
]


  return (
    <>
        <div className="card_history_container">
          <Tabs items={options} color="warning" aria-label="Tabs colors" radius="full">
            {(item) => (
              <Tab key={item.name} title={item.name}>
                <>
                  {item.type}
                </>
                
              </Tab>
            )}


            </Tabs>
      </div>

    </>
  );
}
export default HistoryFinancial;
