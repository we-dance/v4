<script setup lang="ts">
interface Epic {
  _path: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
  labels: string[];
  created_at: string;
  due_date: string;
  body: {
    driver?: string;
    "user-stories"?: string[];
    "success-metrics"?: string[];
    "related-issues"?: string[];
  };
}

interface Issue {
  _path: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: string;
  assignee: string;
  labels: string[];
  created_at: string;
  due_date: string;
  epic?: string;
  body?: any;
}

const { data: issuesData } = await useAsyncData("issues", () =>
  queryContent<Issue>("/issues").find()
);

const { data: epicsData } = await useAsyncData("epics", () =>
  queryContent<Epic>("/epics").find()
);

const selectedEpic = ref<string | null>(null);

const epicMap = computed(() => {
  if (!epicsData.value) return new Map();

  const map = new Map();
  epicsData.value.forEach((epic) => {
    const epicId = epic._path.split("/").pop()?.replace(".md", "");
    if (epicId) {
      map.set(epicId, {
        title: epic.title,
        description: epic.description,
        body: epic.body,
      });
    }
  });
  return map;
});

const getEpicTitle = (epicId: string) => {
  return epicMap.value.get(epicId)?.title || epicId;
};

const getEpicInfo = (epicId: string) => {
  const epic = epicMap.value.get(epicId);
  console.log(epic);
  return epic;
};

const issues = computed(() => {
  if (!issuesData.value) return [];

  let filteredIssues = issuesData.value.filter((issue) => issue.status);

  if (selectedEpic.value) {
    filteredIssues = filteredIssues.filter(
      (issue) => issue.epic === selectedEpic.value
    );
  }

  // Take only the first occurrence of each _path to avoid duplicates
  const uniqueIssues = new Map();
  filteredIssues.forEach((issue) => {
    if (!uniqueIssues.has(issue._path)) {
      uniqueIssues.set(issue._path, issue);
    }
  });
  return Array.from(uniqueIssues.values());
});

const epics = computed(() => {
  if (!epicsData.value) return [];

  // Get all unique epic IDs from issues
  const epicIds = new Set(
    issuesData.value
      ?.filter((issue): issue is Issue & { epic: string } =>
        Boolean(issue.epic)
      )
      .map((issue) => issue.epic) || []
  );

  // Count issues per epic
  const epicCounts = new Map();
  issuesData.value?.forEach((issue) => {
    if (issue.epic) {
      epicCounts.set(issue.epic, (epicCounts.get(issue.epic) || 0) + 1);
    }
  });

  return Array.from(epicIds).map((epicId) => ({
    id: epicId,
    title: getEpicTitle(epicId),
    count: epicCounts.get(epicId) || 0,
  }));
});

const getIssueId = (path: string) => {
  const match = path.match(/us-(\d+)-/);
  return match ? match[1] : "";
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-destructive";
    case "medium":
      return "bg-warning";
    case "low":
      return "bg-success";
    default:
      return "bg-muted-foreground";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "blocked":
      return "bg-destructive";
    case "in-progress":
      return "bg-warning";
    case "done":
      return "bg-success";
    default:
      return "bg-muted";
  }
};

const getBackgroundColor = (status: string) => {
  switch (status) {
    case "todo":
      return "bg-muted/10";
    case "in-progress":
      return "bg-warning/10";
    case "done":
      return "bg-accent/10";
    default:
      return "bg-muted/10";
  }
};

const selectEpic = (epic: string | null) => {
  selectedEpic.value = selectedEpic.value === epic ? null : epic;
};

const selectedIssue = ref<string | null>(null);

const toggleIssue = async (path: string) => {
  if (selectedIssue.value === path) {
    selectedIssue.value = null;
    return;
  }

  selectedIssue.value = path;
};
</script>

<template>
  <div class="space-y-6">
    <!-- Epics Section -->
    <div class="space-y-3">
      <h2 class="text-sm font-semibold">Epics</h2>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="epic in epics"
          :key="epic.id"
          @click="selectEpic(epic.id)"
          :class="[
            'px-2 py-1 rounded-full text-xs transition-all flex items-center gap-2',
            selectedEpic === epic.id
              ? 'bg-accent/10 text-accent ring-1 ring-accent/20'
              : 'bg-accent/50 text-accent hover:bg-accent/20',
          ]"
        >
          {{ epic.title }}
          <span
            class="px-1.5 py-0.5 rounded-full bg-accent/100 text-accent text-[10px]"
          >
            {{ epic.count }}
          </span>
        </button>
      </div>

      <!-- Selected Epic Details -->
      <div
        v-if="selectedEpic"
        class="mt-3 p-4 rounded-lg border border-accent/20 bg-accent/50 space-y-4"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-medium text-foreground text-sm">
                {{ getEpicTitle(selectedEpic) }}
              </h3>
            </div>
            <p class="mt-1 text-xs text-muted-foreground">
              {{ getEpicInfo(selectedEpic)?.description }}
            </p>
          </div>
        </div>

        <!-- Driver -->
        <div
          v-if="getEpicInfo(selectedEpic)?.body"
          class="prose prose-xs max-w-none prose-headings:text-xs prose-headings:font-semibold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:text-xs prose-li:text-muted-foreground prose-li:text-xs"
        >
          <ContentRendererMarkdown :value="getEpicInfo(selectedEpic)?.body" />
        </div>
      </div>
    </div>

    <!-- Issues Section -->
    <div class="space-y-3">
      <div
        v-for="issue in issues"
        :key="issue._path"
        :class="[
          'rounded-lg p-3 transition-all',
          selectedIssue === issue._path
            ? 'shadow-lg ring-1 ring-accent/20'
            : 'hover:shadow-md',
          getBackgroundColor(issue.status),
        ]"
      >
        <div class="flex items-start gap-3">
          <div class="flex-1">
            <div
              class="flex items-center gap-2 cursor-pointer"
              @click="toggleIssue(issue._path)"
            >
              <div
                :class="[
                  'w-1.5 h-1.5 rounded-full',
                  getPriorityColor(issue.priority),
                ]"
              />
              <div class="text-[10px] text-muted-foreground font-mono">
                US-{{ getIssueId(issue._path) }}
              </div>
              <h3 class="font-medium text-foreground text-sm">
                {{ issue.title }}
              </h3>
              <Icon
                :name="
                  selectedIssue === issue._path
                    ? 'uil:angle-up'
                    : 'uil:angle-down'
                "
                class="w-3 h-3 ml-auto text-muted-foreground"
              />
            </div>
            <p class="mt-1 text-xs text-muted-foreground">
              {{ issue.description }}
            </p>

            <div class="mt-2 flex flex-wrap items-center gap-2">
              <div class="flex gap-1">
                <button
                  v-if="issue.epic"
                  @click.stop="selectEpic(issue.epic)"
                  class="text-[10px] px-1.5 py-0.5 rounded-full border border-accent/20 bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                >
                  {{ getEpicTitle(issue.epic) }}
                </button>
                <Badge
                  v-for="label in issue.labels"
                  :key="label"
                  variant="secondary"
                  class="text-[10px] px-1"
                >
                  {{ label }}
                </Badge>
              </div>

              <div
                class="flex items-center gap-1 text-[10px] text-muted-foreground"
              >
                <Icon name="uil:user" class="w-3 h-3" />
                {{ issue.assignee }}
              </div>

              <Badge
                class="text-[10px]"
                :class="{
                  'bg-muted hover:bg-muted/80': issue.status === 'todo',
                  'bg-info/10 hover:bg-info/20': issue.status === 'in-progress',
                  'bg-success/10 hover:bg-success/20': issue.status === 'done',
                }"
              >
                {{ issue.status }}
              </Badge>
            </div>

            <!-- Expanded Content -->
            <div
              v-if="selectedIssue === issue._path"
              class="mt-4 prose prose-xs max-w-none prose-headings:text-xs prose-headings:font-semibold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:text-xs prose-li:text-muted-foreground prose-li:text-xs"
            >
              <ContentRendererMarkdown v-if="issue.body" :value="issue.body" />
              <div v-else class="text-xs text-muted-foreground italic">
                Loading content...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
