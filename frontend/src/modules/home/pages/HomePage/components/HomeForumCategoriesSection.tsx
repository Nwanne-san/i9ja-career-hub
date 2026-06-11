import ForumCategoryTile from "@/modules/shared/component/ForumCategoryTile";
import { AppRoutes } from "@/routes/app.routes";
import { Briefcase, Code, DollarSign, Home } from "lucide-react";
import { HOME_FORUM_CATEGORIES } from "../homePage.content";

const categoryIcons = {
  career: Briefcase,
  tech: Code,
  money: DollarSign,
  rent: Home,
};

export function HomeForumCategoriesSection() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-display text-lg font-bold text-ink sm:text-xl">
        Forum Categories
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {HOME_FORUM_CATEGORIES.map((cat) => {
          const Icon = categoryIcons[cat.id as keyof typeof categoryIcons];
          return (
            <ForumCategoryTile
              key={cat.id}
              icon={Icon}
              label={cat.label}
              href={`${AppRoutes.forums}?category=${cat.id}`}
            />
          );
        })}
      </div>
    </div>
  );
}
