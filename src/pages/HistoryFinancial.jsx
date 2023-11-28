import "../styleheets/HistoryFinancial.css"
import ViewHistory from "../components/History_financial_components/ViewHistory";
import {Tabs, Tab} from "@nextui-org/react";
function HistoryFinancial() {
  let options=[
    {
      "name":"INGRESOS",
      "type":<ViewHistory
      table={"income"}
      table_category = {"income_category"}
    />
    },
    {
      "name":"GASTOS",
      "type":<ViewHistory
      table={"expenses"}
      table_category = {"expenses_category"}
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
