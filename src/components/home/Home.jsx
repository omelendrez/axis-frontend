import { Loading } from "../shared";
import { Logo } from "./Logo";
import { Text } from "./Text";

export const Home = ({ loading }) => {
  if (loading) {
    return <Loading />;
  }
  return (
    <article className="home">
      <Logo />
      <Text />
    </article>
  );
};
