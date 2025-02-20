/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import * as React from "react";
import { Admin, Resource, List, Datagrid, TextField } from "react-admin";
import dataProvider from "../model/dataProfider";
import { ManagerEdit } from "@/features/ManagerEdit";
import { ManagerCreate } from "@/features/ManagerCreate";

const ManagerList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="full_name" />
      <TextField source="iin" />
      <TextField source="phone" />
    </Datagrid>
  </List>
);

export default function AdminManagers() {
  return (
    // @ts-ignore
    <Admin dataProvider={dataProvider}>
      <Resource
        name="users"
        list={ManagerList}
        edit={ManagerEdit}
        create={ManagerCreate}
      />
    </Admin>
  );
}
