import { Dev } from "components/Dev";

export default function Schedules() {
    return (
        <>
            <Dev 
            title='Schedules' 
            links={[
                {name: "Schedule one", url: "/schedules/one"},
                {name: "Schedule two", url: "/schedules/two"},
                {name: "Schedule three", url: "/schedules/three"},
                {name: "Schedule four", url: "/schedules/four"},
                {name: "Schedule five", url: "/schedules/five"},
            ]}
            />
        </>
    )
}