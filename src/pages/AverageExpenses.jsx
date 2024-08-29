import "../styleheets/AverageExpenses.css";
import ViewForMonth from "../components/Home_components/viewForMonth";
import ViewForYear from "../components/Home_components/viewForYear";
import { Tabs, Tab } from "@nextui-org/react";
function AverageExpenses() {
  let options = [
    {
      name: "MES",
      type: <ViewForMonth />,
    },
    {
      name: "AÑO",
      type: <ViewForYear />,
    },
  ];
  return (
    <>
        <div className="content_index">
            <Tabs items={options} color="warning" aria-label="Tabs colors">
                {(item) => (
                <Tab key={item.name} title={item.name}>
                    <>{item.type}</>
                </Tab>
                )}
            </Tabs>
      </div>
    </>
  );
}

export default AverageExpenses;
