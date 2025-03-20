import CalMonHeader from "./CalMonHeader";
import CalMonMain from "./CalMonMain";

export default function CalMonInner() {
 
  return (
    <>
      <div className="container-calMonth">
       <CalMonHeader/>
        <CalMonMain />
      </div>
    </>
  );
}
