
"use client";

import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export function BreadCrumbs() {
  return (
    <Breadcrumb aria-label="Default breadcrumb example">
      <Breadcrumb.Item href="#" icon={HiHome}>Home</Breadcrumb.Item>
      <Breadcrumb.Item href="#">Projects</Breadcrumb.Item>
      <Breadcrumb.Item>Flowbite React</Breadcrumb.Item>
    </Breadcrumb>
  );
}
