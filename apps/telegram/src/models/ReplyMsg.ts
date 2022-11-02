import { InlineMessageXFragment } from '@grammyjs/hydrate/out/data/inline-message';
import { Message, MsgWith } from 'grammy/out/types.node';

export type ReplyMsg = Message.CommonMessage & MsgWith<'text'> & InlineMessageXFragment & Message;
