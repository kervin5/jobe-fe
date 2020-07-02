import React from "react";
import { Header, Image, Table } from "semantic-ui-react";

const TableChart = ({ data, keys }) => (
  <Table basic="very" celled collapsing style={{ width: "100%" }}>
    <Table.Header>
      <Table.Row>
        {Object.values(keys).map((keyName, index) => (
          <Table.HeaderCell key={keyName + index}>
            {firstToUpperCase(keyName.key)}
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {data.map((dataItem, key) => (
        <Table.Row key={dataItem.name + key}>
          <Table.Cell>
            <Header as="h4" image>
              <Image src="/images/avatar.PNG" rounded size="mini" />
              <Header.Content>
                {dataItem.name}
                <Header.Subheader>{dataItem.name2}</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>{dataItem.value}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default TableChart;

function firstToUpperCase(string) {
  return string.replace(/^./, string[0].toUpperCase());
}
