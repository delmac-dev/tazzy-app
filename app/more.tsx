import { Dev } from "components/Dev";

export default function More() {
    return (
        <>
            <Dev 
            title='more page' 
            links={[
                {name: "Account", url: "/profile/account"},
                {name: "Templates", url: "/profile/templates"},
                {name: "Terms and Conditions", url: "/profile/toa"},
                {name: "Privacy Policy", url: "/profile/privacy"},
            ]}
            />
        </>
    )
}