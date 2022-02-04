// import { useRouter } from "next/router";
import Head from "next/head";

import EventSummary from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import Comments from "../../components/input/comments";

import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

const DetailEventPage = (props) => {
  // const router = useRouter();
  // const eventId = router.query.eventId;

  const event = props.selectedEvent;

  if (!event) {
    return (
      <>
        <Head>
          <title>{event.title}</title>
          <meta name="description" content={event.description} />
        </Head>
        <div className="center">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
};

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event[0],
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const allEvents = await getFeaturedEvents();

  const paths = allEvents.map((event) => ({ params: { eventId: event.id } }));

  return { paths, fallback: true };
};

export default DetailEventPage;
