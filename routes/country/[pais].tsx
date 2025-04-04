import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios"
type Data = {
  name: string;
  capital: string;
}

export const handler: Handlers<Data> = {
  async GET (req: Request, ctx: FreshContext<unknown, Data>)  {
    const url = new URL(req.url);
    const name = url.searchParams.get("name") || "";
    const API_KEY = Deno.env.get("API_KEY");
    let urlapi = "https://api.api-ninjas.com/v1/country";
    if(name){
      urlapi = urlapi + "?name=" + name;
      const response = await Axios.get(urlapi, {
        headers:{
          "X-Api-Key": API_KEY,
        }
      })
      
      return ctx.render({
        name, 
        capital: response.data.capital
      });
    }
      
    return ctx.render({
      name,
      capital: ""
    });

  },
};

const Page = (props: PageProps<Data>) => {
  const {name, capital} = props.data;
  return (
    <div>
        <li>NAME: {name}</li>
        <li>CAPITAL: {capital}</li>
    </div>
  );
}

export default Page;
