import AchievementsGrid from "./AchievementsGrid";

const ProfileHeader = () => (
  <>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 className="text-2xl font-bold">Anthony Dourado</h1>
      <AchievementsGrid />
    </div>

    <p className="text-muted-foreground mt-2 text-base sm:text-lg">
      Product Owner | Software Engineer
    </p>

    <p className="text-sm text-justify mt-2 leading-relaxed line-clamp-4 sm:line-clamp-none">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
      consectetur vitae laborum possimus odit ad officiis facere, minus
      quisquam, fugit culpa optio, dolorem repudiandae aspernatur? Laborum
      accusantium ut cumque impedit assumenda illum ab sapiente nisi vel dicta,
      rerum tenetur fugit.
    </p>
  </>
);

export default ProfileHeader;
