import React from "react";
import Wrapper from "./_components/Wrapper";
import SideBarHeader from "./_components/SideBarHeader";
import SideBarLinks from "./_components/SideBarLinks";
import SidebarActions from "./_components/SidebarActions";
interface ChannelProps {
  channel: any;
}
const DashBoardSidebar = ({ channel }: ChannelProps) => {
  return (
    <Wrapper>
      <SideBarHeader channel={channel}/>
      <SideBarLinks channel={channel}/>
      <SidebarActions channel={channel} />
    </Wrapper>
  );
};

export default DashBoardSidebar;
