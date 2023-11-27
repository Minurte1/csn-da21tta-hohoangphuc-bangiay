
const shoesData = () => {
    const [shoesData, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/data");
                if (!response.ok) {
                    throw new Error("Yêu cầu không thành công");
                }

                const jsonResponse = await response.json();
                const responseData = JSON.parse(jsonResponse);

                setData(responseData);
                console.log(responseData);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);


}
export default shoesData;