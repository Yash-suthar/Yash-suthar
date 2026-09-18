import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { Profile } from "@/types/profile";

const styles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 36,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: "#111111",
    lineHeight: 1.28,
  },
  name: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  headline: {
    marginTop: 4,
    fontSize: 10.5,
    color: "#222222",
  },
  contact: {
    marginTop: 6,
    fontSize: 9,
    color: "#333333",
  },
  rule: {
    marginTop: 10,
    marginBottom: 8,
    height: 1,
    backgroundColor: "#111111",
  },
  sectionTitle: {
    marginTop: 7,
    marginBottom: 3,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  body: {
    fontSize: 10,
    textAlign: "justify",
  },
  skillLine: {
    marginBottom: 2,
    fontSize: 10,
  },
  skillLabel: {
    fontFamily: "Helvetica-Bold",
  },
  jobHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  jobRole: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    flex: 1,
  },
  jobMeta: {
    fontSize: 9.5,
    color: "#333333",
  },
  org: {
    marginTop: 1,
    marginBottom: 3,
    fontSize: 10,
  },
  bullet: {
    marginLeft: 8,
    marginBottom: 2,
  },
  projectHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 4,
  },
  projectName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    flex: 1,
  },
  eduHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 2,
  },
});

function ContactLine({ profile }: { profile: Profile }) {
  const parts = [
    profile.phone,
    profile.email,
    profile.location,
    "github.com/Yash-suthar",
    "linkedin.com/in/yash-suthar-163455226",
  ];
  return <Text style={styles.contact}>{parts.join("  |  ")}</Text>;
}

export function ResumeDocument({ profile }: { profile: Profile }) {
  return (
    <Document
      title={`${profile.fullName} Resume`}
      author={profile.fullName}
      subject="Full-stack engineer resume"
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.headline}>
          Full-Stack Engineer  |  React Native, Next.js, Node.js, .NET
        </Text>
        <ContactLine profile={profile} />
        <View style={styles.rule} />

        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.body}>{profile.about}</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        {profile.skillGroups.map((group) => (
          <Text key={group.label} style={styles.skillLine}>
            <Text style={styles.skillLabel}>{group.label}: </Text>
            {group.items.join(", ")}
          </Text>
        ))}

        <Text style={styles.sectionTitle}>Experience</Text>
        {profile.experience.map((job) => (
          <View key={`${job.role}-${job.period}`} wrap={false}>
            <View style={styles.jobHead}>
              <Text style={styles.jobRole}>{job.role}</Text>
              <Text style={styles.jobMeta}>{job.period}</Text>
            </View>
            <Text style={styles.org}>
              {job.organization}  |  {job.location}
            </Text>
            {job.bullets.map((bullet) => (
              <Text key={bullet} style={styles.bullet}>
                • {bullet}
              </Text>
            ))}
          </View>
        ))}

        <Text style={styles.sectionTitle}>Selected Projects</Text>
        {profile.projects.map((project) => (
          <View key={project.name} wrap={false}>
            <View style={styles.projectHead}>
              <Text style={styles.projectName}>
                {project.name}  —  {project.stack.join(", ")}
              </Text>
              <Text style={styles.jobMeta}>{project.period}</Text>
            </View>
            {project.bullets.map((bullet) => (
              <Text key={bullet} style={styles.bullet}>
                • {bullet}
              </Text>
            ))}
          </View>
        ))}

        <Text style={styles.sectionTitle}>Education</Text>
        {profile.education.map((item) => (
          <View key={item.school} style={styles.eduHead}>
            <Text>
              <Text style={styles.skillLabel}>{item.school}</Text>
              {`  —  ${item.credential}, ${item.location}`}
            </Text>
            <Text style={styles.jobMeta}>{item.year}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
