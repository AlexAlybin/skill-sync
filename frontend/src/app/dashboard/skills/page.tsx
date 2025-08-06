import SkillsDashboard from "@/components/skills/SkillsDashboard";
import { withAuth } from "@/lib/withAuth";

const SkillsPage = () => {
  return (
    <>
      <h1>My Skills</h1>
      <SkillsDashboard />
    </>
  );
};

export default withAuth(SkillsPage);
