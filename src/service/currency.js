// import axios from "axios";
import axios from "axios";
import { useQuery } from "react-query";

async function fetchData() {
    try {
        let response = await axios.get('https://economia.awesomeapi.com.br/USD-BRL/10');
        let dataJson = response.data[0].high.slice(0, 4);
        return dataJson;
    } catch (error) {
        console.log(error);
    }
}

export default function useCurrencyData() {
   return useQuery({
        queryKey: ['currency'],
        queryFn: fetchData,
        refetchInterval: 240000
    })
}