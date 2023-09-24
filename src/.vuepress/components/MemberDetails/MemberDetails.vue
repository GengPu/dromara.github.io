<script setup lang='ts'>
/**
 * 针对组织成员的详情页面，详情页分为上下两部分组成
 * 上半部分类似
 * |           |  name  |             |
 * |    [x]    |        |  desc       |
 * |           |        |  sendWord   |
 * |           |        |             |
 * | projects  |        |             |
 * |    name   |  role  |  contribute   |   honor   |
 * |           |        |               |           |
 *
 */
import { useSiteLocaleData } from '@vuepress/client';
import { type MembersOption, type Member, type ProjectInfo } from '../MembersPage/types';
import { ref, reactive, watch, onMounted, defineComponent } from 'vue';
import enMembersOption from '../MembersPage/en';
import zhMembersOption from '../MembersPage/zh';

// = defineProps<Member>();

const siteLocaleData = useSiteLocaleData();
const lang = ref(siteLocaleData.value.lang);

let membersOption: MembersOption = reactive({
  MEMBERS: '',
  DESCRIPTION: '',
  TOC_MEMBER_TITLE: '',
  COMMITTEE_TITLE: '',
  COMMITTER_TITLE: '',
  FOUNDER: { role: '', name: '', photo: '', desc: '', projects:[] },
  TOC_MEMBERS: [],
  COMMITTEES: [],
  COMMITTERS: []
});
 let member: Member = { desc: '', name: '', photo: '', role: '' };
// 取

// 取出查询参数
console.log(location.search.substring(1).split('=')[1]);
let name = decodeURI(location.search.substring(1).split('=')[1]);
let objectStr = sessionStorage.getItem(name)
member = JSON.parse(objectStr);

watch(
  // 图个省事，用图片路径作为索引进行筛选
  () => siteLocaleData.value.lang,
  (newLang) => {
    lang.value = newLang;
    if (lang.value === 'zh-CN' || lang.value === '/zh/') {
      membersOption = zhMembersOption;
    } else {
      membersOption = enMembersOption;
    }
    if (member.photo == membersOption.FOUNDER.photo){
      member = membersOption.FOUNDER;
    } else if (membersOption.TOC_MEMBERS.filter((value: Member, index: number, array: Member[]) => new RegExp(member.photo).test(value.photo))){
      member = membersOption.TOC_MEMBERS.filter((value: Member, index: number, array: Member[]) => new RegExp(member.photo).test(value.photo))[0];
    } else if (membersOption.COMMITTEES.filter((value: Member, index: number, array: Member[]) => new RegExp(member.photo).test(value.photo))){
      member = membersOption.COMMITTEES.filter((value: Member, index: number, array: Member[]) => new RegExp(member.photo).test(value.photo))[0];
    } else if (membersOption.COMMITTERS.filter((value: Member, index: number, array: Member[]) => new RegExp(member.photo).test(value.photo))){
      member = membersOption.COMMITTERS.filter((value: Member, index: number, array: Member[]) => new RegExp(member.photo).test(value.photo))[0];
    }
  },
  {
    immediate: true
  }
);

</script>

<template>
  <main class="member-details-page">
      <div class="member-info">
        <div class='member-photo'>
          <img class="photo" :src="member.photo" alt="{{member.name}}" />
        </div>
        <div>
          <h3 class='member-name'>{{member.name}}</h3>
          <div class='member-desc'>
            {{member.desc}}
          </div>
          <div class='member-sendWord'>
            {{member.sendWord}}
          </div>
        </div>
      </div>
    <div class='member-projects'>
      <ul class="project-info">
        <li
          class="project non-overlay"
          v-for="(projectInfo, index) in member.projects"
          :key="index"
        >
          <div class="info">
            <div class="project-name">{{ projectInfo.name }}</div>
            <div class="project-role">{{ projectInfo.role }}</div>
            <div class="project-contribute">{{ projectInfo.contribute }}</div>
            <div class="project-honor">{{ projectInfo.honor }}</div>
          </div>
        </li>
      </ul>
    </div>

  </main>

</template>

<style scoped lang='scss'>

// 信息总面板
.member-details-page{
  padding-top: var(--navbar-height);
  min-width: 600px;
  .bg-white {
    background-color: #2354bd;
  }
}

// 人员信息面板
.member-info{
  border-style:solid;
	border-width:1px;
  border-color: #bd3e2e;
}
// 图片
.member-photo{
  border-style:solid;
	border-width:1px;
  border-color: #2ebd81;
}

// 人员名称
.member-name{
  border-style:solid;
	border-width:1px;
  border-color: #1d34c3;
}
// 人员说明
.member-desc{
  border-style:solid;
	border-width:1px;
  border-color: #bc14e1;
}
// 人员寄语
.member-sendWord{
  border-style:solid;
	border-width:1px;
  border-color: #c89790;
}
// 人员所属项目面板
.member-projects{

}
// 单项目基本信息面板
.project-info{

}
// 成员的项目列表
.project{}

// 项目信息清单
.info{}

// 项目名称
.project-name{}

// 成员在项目中的角色
.project-role{}

// 成员在项目中的贡献
.project-contribute{}

// 成员在项目中获得的荣誉
.project-honor{}

</style>
