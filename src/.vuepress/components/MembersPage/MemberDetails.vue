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
import { type MembersOption, type Member, type ProjectInfo } from './types';
import { ref, reactive, watch, onMounted, defineComponent } from 'vue';
import enMembersOption from './en';
import zhMembersOption from './zh';

let member = defineProps<Member>();

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
  <div class="member-details-page">
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

  </div>

</template>

<style scoped lang='scss'>

</style>
