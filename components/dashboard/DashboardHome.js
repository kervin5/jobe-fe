import NoSSR from "react-no-ssr";
import Button from "@material-ui/core/Button";
import MaterialTable from "material-table";

const DashboardHome = props => {
  return (
    <div>
      <NoSSR>
        <MaterialTable
          columns={[
            { title: "Adı", field: "name" },
            { title: "Soyadı", field: "surname" },
            { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
            {
              title: "Doğum Yeri",
              field: "birthCity",
              lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
            }
          ]}
          data={[
            { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 }
          ]}
          title="Demo Title"
        />
      </NoSSR>
    </div>
  );
};

export default DashboardHome;
