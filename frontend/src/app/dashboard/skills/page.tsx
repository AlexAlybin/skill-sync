import SkillsDashboard from "@/components/skills/SkillsDashboard";
import { withAuth } from "@/lib/withAuth";

const SkillsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Skills</h1>
      <SkillsDashboard />
    </div>
  );
};

export default withAuth(SkillsPage);
