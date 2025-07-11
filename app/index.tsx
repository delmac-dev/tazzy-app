import { Dev } from 'components/Dev';

export default function Index() {
  return (
    <>
      <Dev 
        title='Home' 
        links={[
          {name: "Schedules", url: "/schedules"},
        ]}
      />
    </>
  );
}