import Image from "next/image";

import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import LogisticsItem from "./logistics-item";

import classes from "./event-logistics.module.css";

const EventLogistics = ({ date, address, image, imageAlt }) => {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const addressText = address.replace(", ", "\n");

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image
          src={"/" + image}
          alt={imageAlt}
          width={400}
          height={400}
          priority
        />
      </div>

      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
};

export default EventLogistics;
