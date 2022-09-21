import { GetServerSideProps, GetStaticProps } from "next";

interface Props {
  repositories: string[];
  date: string;
}

const Home = ({ repositories, date }: Props) => {
  return (
    <div>
      <h3>{date}</h3>
      <ul>
        {repositories.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("https://api.github.com/users/itsbetma/repos");
  const data = await response.json();
  const repositoryNames = (data as Array<{ name: string }>).map(
    (item) => item.name
  );
  return {
    props: {
      repositories: repositoryNames,
      date: new Date().toJSON(),
    },
    revalidate: 5,
  };
};

// export const getServerSideProps: GetServerSideProps = async () => {
//     const response  = await fetch('https://api.github.com/users/itsbetma/repos')
//     const data = await response.json()
//     const repositoryNames = (data as Array<{name: string}>).map((item)=> item.name)
//     return {
//         props: {
//             repositories: repositoryNames,
//             date: new Date().toJSON(),
//           }
//       }
//   }

export default Home;
