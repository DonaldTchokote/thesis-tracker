"use client";
import { Card } from "@radix-ui/themes";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
interface Translations {
  open: string;
  registered: string;
  inProgress: string;
  submitted: string;
  defended: string;
  cancelled: string;
  closed: string;
}

interface Props {
  open: number;
  registered: number;
  inProgress: number;
  submitted: number;
  defended: number;
  canceled: number;
  closed: number;
  translations: Translations;
}

const ThesisChart = ({
  open,
  registered,
  inProgress,
  submitted,
  defended,
  canceled,
  closed,
  translations,
}: Props) => {
  const {
    cancelled: cancelledTranslation,
    closed: closedTranslation,
    defended: defendedTranslation,
    inProgress: inProgressTranslation,
    open: openTranslation,
    registered: registeredTranslation,
    submitted: submittedTranslation,
  } = translations;
  const data = [
    { label: openTranslation, value: open },
    { label: registeredTranslation, value: registered },
    { label: inProgressTranslation, value: inProgress },
    { label: submittedTranslation, value: submitted },
    { label: defendedTranslation, value: defended },
    { label: cancelledTranslation, value: canceled },
    { label: submittedTranslation, value: closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey={"label"} />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ThesisChart;
