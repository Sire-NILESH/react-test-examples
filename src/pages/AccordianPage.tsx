import {
  Page,
  PageBody,
  PageDescription,
  PageHeader,
  PageTitle,
} from "../components/Page";
import Accordian, { AccordianItem } from "../components/accordian/Accordian";

const accordianItems: AccordianItem[] = [
  {
    id: 1,
    title: "Where are these chairs assembled?",
    content: {
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium dolor at sequi obcaecati cupiditate. Voluptates repellendus cupiditate aperiam! Incidunt amet quo neque.",
      points: [
        {
          id: 1,
          label: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        },
        {
          id: 2,
          label:
            "Quasi accusamus corporis totam tempora suscipit ab obcaecati.",
        },
        {
          id: 3,
          label: "Tempora, et atque officia at consequatur laborum!",
        },
        {
          id: 4,
          label: "Repudiandae praesentium illo voluptate in, atque enim.",
        },
      ],
    },
  },
  {
    id: 2,
    title: "How long do I have to return my chair?",
    content: {
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium dolor at sequi obcaecati cupiditate. Voluptates repellendus cupiditate aperiam! Incidunt amet quo neque.",
      points: [
        {
          id: 1,
          label: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        },
        {
          id: 2,
          label:
            "Quasi accusamus corporis totam tempora suscipit ab obcaecati.",
        },
        {
          id: 3,
          label: "Tempora, et atque officia at consequatur laborum!",
        },
        {
          id: 4,
          label: "Repudiandae praesentium illo voluptate in, atque enim.",
        },
      ],
    },
  },
  {
    id: 3,
    title: "Do you ship to countries outside the EU?",
    content: {
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium dolor at sequi obcaecati cupiditate. Voluptates repellendus cupiditate aperiam! Incidunt amet quo neque.",
      points: [
        {
          id: 1,
          label: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        },
        {
          id: 2,
          label:
            "Quasi accusamus corporis totam tempora suscipit ab obcaecati.",
        },
        {
          id: 3,
          label: "Tempora, et atque officia at consequatur laborum!",
        },
        {
          id: 4,
          label: "Repudiandae praesentium illo voluptate in, atque enim.",
        },
      ],
    },
  },
];

const Pointer = () => {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Accordian in JS</PageTitle>
        <PageDescription>
          A simple accordian component made compleltely in JS/TS only without
          react.
        </PageDescription>
      </PageHeader>

      <PageBody>
        <Accordian items={accordianItems} />
      </PageBody>
    </Page>
  );
};

export default Pointer;
