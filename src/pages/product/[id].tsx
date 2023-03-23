import { useAxios } from "@/hooks/useAxios";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  id: number;
}

const ProductPage: NextPage<Props> = ({ id }) => {
  return <div>MNY IDZ{id}</div>;
};

ProductPage.getInitialProps = async ({ query }) => {
  const { id = "1" } = query;
  const idNum = parseInt(id as string, 10);
  return { id: idNum };
};

export default ProductPage;
