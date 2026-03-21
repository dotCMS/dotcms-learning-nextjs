import { ComponentType } from "react";

import { CustomNoComponent } from "./Empty";
import Banner from "./Banner";
import BannerCarousel from "./BannerCarousel";
import Card from "./Card";
import Code from "./Code";
import FaqWidget from "./FaqWidget";
import ImageComponent from "./Image";
import PageForm from "./PageForm";
import VtlInclude from "./VtlInclude";
import Video from "./Video";
import WebPageContent from "./WebPageContent";
import BlogCard from "../BlogCard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pageComponents: Record<string, ComponentType<any>> = {
  Blog: BlogCard,
  Banner,
  Code,
  BannerCarousel,
  Card,
  CustomNoComponent,
  FaqWidget,
  Image: ImageComponent,
  PageForm,
  VtlInclude,
  Video,
  webPageContent: WebPageContent,
};
