<template>
  <div class="w-full lg:w-[400px]">
    <h1 class="text-2xl font-semibold text-center mb-6">List of specifications</h1>

    <ul>
      <li class="mb-4" v-for="specification in specifications" :key="specification.id">
        <div class="header cursor-pointer bg-gray-200 px-3 py-2 border border-gray-500 text-center"
             :class="activeSpecId === specification.id ? 'rounded-t-md border-b-0' : 'rounded-md'"
             @click="selectSpecification(specification.id)">{{ specification.name }}
        </div>

        <div class="content text-center py-2 border border-dashed border-gray-500" v-if="activeSpecId === specification.id">
          <p>Engine - {{ specification.engine || 'N/A' }}</p>
          <p>Color - {{ specification.color || 'N/A' }}</p>
          <p>Interior Material - {{ specification.interiorMaterial || 'N/A' }}</p>
          <p>Wheel size - {{ specification.wheelSize || 'N/A' }}</p>
          <p>Wheel model - {{ specification.wheelModel || 'N/A' }}</p>
          <p>Air suspension - {{ specification.airSuspension }}</p>
          <p>Signature - {{ specification.signature || 'N/A' }}</p>
          <p v-if="specification.year">Year - {{ specification.year }}</p>
        </div>
      </li>
    </ul>

    <div class="text-center mt-8">
      <button class="bg-green-500 text-white rounded-lg px-4 py-2" @click="emit('updateSelectedId',0)">+ Make new
        specification
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {defineEmits, defineProps} from "vue";
  import {specificationsI} from "../interface";

  interface ListEmits {
    (e: "updateSelectedId", id: number): void;
  }

  interface ListProps {
    activeSpecId: number
    specifications: specificationsI[]
  }

  const emit = defineEmits<ListEmits>();
  const props = defineProps<ListProps>()

  // Methods
  const selectSpecification = (id: number) => {
    emit('updateSelectedId', id === props.activeSpecId ? 0 : id)
  }
</script>
