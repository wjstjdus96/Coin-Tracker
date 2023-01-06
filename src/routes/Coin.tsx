import { useParams } from "react-router";

function Coin() {
  const { coinId } = useParams<{ coinId: string }>();
  return <div>hi</div>;
}

export default Coin;
