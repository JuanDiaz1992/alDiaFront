import GetHeritages from "../components/Heritages/SimpleGetHeritages";
function Heritage(){
    return(
        <>
            <section className="home_container gap-[78px] pt-[80px] w-[100%]  flex flex-col md:pl-[162px]  pb-[20px] lg:pb-[20px] lg:min-h-[100vh] h-fit">
                <GetHeritages/>
            </section>
        </>
    );
}
export default Heritage;