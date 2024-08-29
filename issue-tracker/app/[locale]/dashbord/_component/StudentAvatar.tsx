"use client";
import StudentDetails from "@/app/[locale]/students/[id]/StudentDetails";
import { getInitials } from "@/app/[locale]/components/utils";
import { Student } from "@prisma/client";
import { Avatar, Flex } from "@radix-ui/themes";
import { useState } from "react";

interface Props {
  student: Student;
}

const StudentAvatarCard = ({ student }: Props) => {
  const [showCard, setShowCard] = useState(false);
  return (
    <div
      className="hovers-card"
      onMouseEnter={() => setShowCard(true)}
      onMouseLeave={() => setShowCard(false)}
    >
      <Avatar
        className="hover-card "
        size="3"
        radius="full"
        color="indigo"
        fallback={
          getInitials(student.firstName) + getInitials(student.lastName)
        }
      />
      {/* {showCard && <div><StudentDetails student={student} /></div>} */}
    </div>
  );
};

export default StudentAvatarCard;
