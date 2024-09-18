import "../styleheets/HistoryFinancial.css"
import ViewHistory from "../components/History_financial_components/ViewHistory";
import {Tabs, Tab} from "@nextui-org/react";
function HistoryFinancial() {

  let options=[
    {
      "name":"INGRESOS",
      "type":<ViewHistory
      table={"incomes"}
    />
    },
    {
      "name":"GASTOS",
      "type":<ViewHistory
      table={"expenses"}

      />
    }
]


  return (
    <>
      <div className="card_history_container overflow-hidden h-[500px]">
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
