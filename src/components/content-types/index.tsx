import { ComponentType } from "react";

import { CustomNoComponent } from "./Empty";
import Banner from "./Banner";
import BannerCarousel from "./BannerCarousel";
import Card from "./Card";
import ImageComponent from "./Image";
import WebPageContent from "./WebPageContent";
import BlogCard from "../BlogCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pageComponents: Record<string, ComponentType<any>> = {
  Blog: BlogCard,
  Banner,
  BannerCarousel,
  Card,
  CustomNoComponent,
  Image: ImageComponent,
  webPageContent: WebPageContent,
};
