import { GetStaticProps } from "next/types";

interface Props {
  date: string;
}

export default function BlogPost({ date }: Props) {
  return <h1>{date}</h1>;
}

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { slug: "hello" } }, { params: { slug: "hi" } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      date: new Date().toJSON(),
    },
    revalidate: 10,
  };
};
