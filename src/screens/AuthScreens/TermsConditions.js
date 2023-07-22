import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const TermsConditions = () => {
  const termsAndConditions = [
    {
      term: "Terms and Conditions of Borsa",
      description:
        'These Terms and Conditions ("Agreement") govern your use of the Borsa messaging app ("Borsa" or the "App"). By accessing or using the App, you agree to be bound by this Agreement. If you do not agree with any part of this Agreement, you must refrain from using the App.',
    },
    {
      term: "1. Acceptance of Terms",
      description:
        "1.1. By using Borsa, you affirm that you are at least 18 years old and have the legal capacity to enter into this Agreement.\n\n1.2. Borsa reserves the right to modify, update, or replace this Agreement at any time without prior notice. Your continued use of the App following any such changes constitutes your acceptance of the revised Agreement.",
    },
    {
      term: "2. App Description",
      description:
        "2.1. Borsa is a messaging app designed to connect Travelers and Shippers for the purpose of facilitating logistics.\n\n2.2. Borsa is a platform for communication and does not take responsibility for the actions, conduct, or transactions between users.",
    },
    {
      term: "3. User Conduct",
      description:
        "3.1. Users of Borsa are solely responsible for their actions and communications within the App.\n\n3.2. Users are expected to conduct themselves truthfully, professionally, and respectfully when engaging with other users.",
    },
    {
      term: "4. Liability and Disclaimers",
      description:
        "4.1. Borsa acts solely as a communication platform and does not assume liability for any transactions, agreements, or disputes that may arise between users.\n\n4.2. Borsa does not guarantee the accuracy, completeness, or reliability of any information exchanged between users or contained within the App.\n\n4.3. Users acknowledge that Borsa is not responsible for verifying the identity, qualifications, or authenticity of any user, and they agree to exercise caution and conduct their own due diligence before engaging in any transaction.\n\n4.4. Borsa disclaims all warranties, whether express or implied, including but not limited to fitness for a particular purpose, non-infringement, and compatibility with users' devices.",
    },
    {
      term: "5. Intellectual Property",
      description:
        "5.1. All content, including but not limited to text, images, logos, and trademarks, contained within the App are the property of Borsa or its licensors and are protected by intellectual property laws.\n\n5.2. Users may not reproduce, modify, distribute, or create derivative works of any content without prior written consent from Borsa.",
    },
    {
      term: "6. Pre-release Version and Bugs",
      description:
        '6.1. Borsa is currently in pre-release version, and as such, may contain bugs, errors, or other technical issues that could impact its functionality or user experience.\n\n6.2. Users acknowledge that the pre-release version of Borsa is provided on an "as is" basis, without warranties of any kind, and Borsa makes no representations or warranties regarding its performance, reliability, or suitability for any purpose.\n\n6.3. Users understand and accept that the pre-release version of Borsa may undergo frequent updates, modifications, or improvements, and some features may be temporarily unavailable or may not work as intended.\n\n6.4. Borsa shall not be held liable for any damages, losses, or inconvenience caused by the use of the pre-release version, including but not limited to data loss, system crashes, or any adverse effects on user devices.\n\n6.5. Users are encouraged to provide feedback, bug reports, or suggestions for improvement to Borsa, which will be greatly appreciated in order to enhance the stability and functionality of the app. ',
    },
    {
      term: "7. Termination",
      description:
        "7.1. Borsa reserves the right to suspend, terminate, or restrict access to the App at any time and for any reason, without prior notice.\n\n7.2. Users may terminate their use of Borsa at any time by uninstalling the App and discontinuing its use.",
    },
    {
      term: "8. Governing Law and Jurisdiction",
      description:
        "7.1. This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising from this Agreement shall be subject to the exclusive jurisdiction of the courts of [Jurisdiction].",
    },
    {
      term: "9. Miscellaneous",
      description:
        "8.1. This Agreement constitutes the entire agreement between the user and Borsa and supersedes any prior understandings or agreements, whether oral or written.\n\n8.2. If any provision of this Agreement is deemed invalid or unenforceable, the remaining provisions shall remain in full force and effect.",
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Terms and Conditions</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {termsAndConditions.map((item, index) => (
          <View key={index} style={styles.termContainer}>
            <Text style={styles.termNumber}>{item.term}</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },

  title: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 36,
  },
  termContainer: {
    marginBottom: 16,
  },
  termNumber: {
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 8,
  },
  descriptionText: {
    marginLeft: 16,
    fontFamily: "Poppins_400Regular",
  },
});

export default TermsConditions;
