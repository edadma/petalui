import React, { useState } from 'react';
import { List, Avatar } from 'asterui';
import { Demo } from './Demo';

const basicData = [
  'Racing car sprints past',
  'Japanese princess unveiled',
  'Australian walks 100km',
  'Man charged over missing wedding',
];

const avatarData = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    name: 'Carol White',
    email: 'carol@example.com',
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
];

export function BasicDemo() {
  return (
    <Demo>
      <List
        dataSource={basicData}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </Demo>
  );
}

export function WithAvatarDemo() {
  return (
    <Demo>
      <List
        dataSource={avatarData}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} alt={item.name} />}
              title={item.name}
              description={item.email}
            />
          </List.Item>
        )}
      />
    </Demo>
  );
}

export function LoadingDemo() {
  return (
    <Demo>
      <List
        dataSource={[]}
        renderItem={(item) => <List.Item>{item}</List.Item>}
        loading
      />
    </Demo>
  );
}

export function PaginationDemo() {
  const allData = Array.from({ length: 23 }, (_, i) => `Item ${i + 1}`);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const currentData = allData.slice(start, end);

  return (
    <Demo>
      <List
        dataSource={currentData}
        renderItem={(item) => <List.Item>{item}</List.Item>}
        pagination={{
          current: page,
          pageSize,
          total: allData.length,
          onChange: setPage,
        }}
      />
    </Demo>
  );
}
