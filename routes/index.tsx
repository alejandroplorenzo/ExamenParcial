import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios"
type Data = {
  number: string;
  country: string;
}

export const handler: Handlers<Data> = {
  async GET (req: Request, ctx: FreshContext<unknown, Data>)  {
    const url = new URL(req.url);
    const number = url.searchParams.get("number") || "";
    const API_KEY = Deno.env.get("API_KEY");
    let urlapi = "https://api.api-ninjas.com/v1/validatephone";
    if(number){
      urlapi = urlapi + "?number=" + number;
      const response = await Axios.get(urlapi, {
        headers:{
          "X-Api-Key": API_KEY,
        }
      })
      
      return ctx.render({
        number, 
        country: response.data.country
      });
    }
      
    return ctx.render({
      number,
      country: ""
    });

  },
};

const Page = (props: PageProps<Data>) => {
  const {number, country} = props.data;
  const url = `/country/${country}`;
  return (
    <div>
      <form action="/">
        <input type="text" name="number" value={number} />
        <button type="submit">Search</button>
      </form>
      <li>Número de telefono: {number}</li>
      <li>Pais: <a href={url}>{country}</a></li>
    </div>
  );
}

export default Page;
