import { Button, Flex } from "@ledgerhq/native-ui";
import React, { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Storyly } from "storyly-react-native";
import { languageSelector } from "../../reducers/settings";

export default function Story(props) {
  const storylyRef = useRef<Storyly>(null);
  const [stories, setStories] = useState([]);

  const storylyTokenFr =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NfaWQiOjY5NDgsImFwcF9pZCI6MTE0MjIsImluc19pZCI6MTIyMDV9._K95dmyom4OkPKu5ENv62n2nsHo-fM_fvrP9GHc8YJc";
  const storylyTokenEn =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NfaWQiOjY5NDgsImFwcF9pZCI6MTE0MjIsImluc19pZCI6MTIxOTh9.XqNitheri5VPDqebtA4JFu1VucVOHYlryki2TqCb1DQ";

  const handleLoad = useCallback(payload => {
    console.log("handleLoad", payload);
    const { storyGroupList } = payload;
    const firstStoryGroup = storyGroupList[0];
    setStories(
      firstStoryGroup.stories.map(obj => ({
        ...obj,
        storyGroupId: firstStoryGroup.id,
      })),
    );
  });

  const handlePressStory = useCallback(({ id, storyGroupId }) => {
    storylyRef.current?.openStoryWithId(storyGroupId, id);
  });

  return (
    <Flex>
      <Storyly
        style={{ width: "100%", height: 120 }}
        ref={storylyRef}
        onLoad={handleLoad}
        onEvent={eventPayload =>
          console.log(
            "[Storyly] onEvent",
            JSON.stringify(eventPayload, null, 2),
          )
        }
        storylyId={storylyTokenEn}
      />
      {stories.map(({ id, storyGroupId, seen, name, title }) => (
        <Button
          type="main"
          onPress={() => handlePressStory({ storyGroupId, id })}
        >
          storyGroup: {title}, name: {name}, [seen: {seen ? "true" : "false"}]
        </Button>
      ))}
    </Flex>
  );
}
