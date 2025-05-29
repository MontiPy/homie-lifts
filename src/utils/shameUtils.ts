export const generateShameMessage = (level: number, name: string) => {
  const tiers = [
    `Hey ${name}, just FYI someone worked out today and you didn’t. No big deal. 😇`,
    `Yo ${name}, someone’s lifting while you’re slacking.`,
    `Damn ${name}, that couch got you in a chokehold huh?`,
    `Bro ${name}… we’re out here lifting and you're out here *resting your eyes*.`,
    `Hey ${name}, the gym misses you. Unlike your gains.`,
    `Shame on you, ${name}.`,
    `This is getting embarrassing, ${name}.`,
    `Lift or be left behind, ${name}.`,
    `You're being called out, ${name}. 👀`,
    `SHAME. SHAME. SHAME. 🔔`,
  ];
  return tiers[Math.min(9, Math.max(0, level - 1))];
};
