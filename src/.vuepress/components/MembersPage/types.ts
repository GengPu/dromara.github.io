export type MembersOption = {
  MEMBERS: string;
  DESCRIPTION: string;
  FOUNDER: Member;
  TOC_MEMBER_TITLE: string;
  COMMITTEE_TITLE: string;
  COMMITTER_TITLE: string;
  MEMBERS_ITEM: MembersGroup[];
};

type MembersGroup = {
  header: string;
  members: Member[];
};

export type Member = {
  // 在团队中的角色
  role: string;
  // 图片的路径
  photo: string;
  //姓名
  name: string;
  // 简介
  desc: string;
  // 寄语
  sendWord?: string;
  // 负责项目 可为空
  projects?:Array<ProjectInfo>;
};

export type ProjectInfo = {
  // 项目的名字
  name: string;
  // 成员在项目中的角色
  role: string;
  // 成员在项目中的贡献
  contribute?: string;
  // 成员在项目中获得的荣誉
  honor?: string;
}
