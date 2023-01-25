import { BrowserRouter, Switch, Route } from "react-router-dom";
import BoardList from "./routes/Board/BoardList";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/board" component={BoardList} />
        <Route path="/:coinId" component={Coin} />
        <Route path="/" component={Coins} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
